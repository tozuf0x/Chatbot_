from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from models import db, Error, siteuser
from flask_cors import CORS 
from datetime import timedelta, datetime, timezone
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:epfub76**@localhost/Errors'
app.config['SECRET_KEY'] = 'supersecretkey'



login_manager = LoginManager()
login_manager.session_protection = "strong"
login_manager.login_view = "login"
login_manager.login_message_category = "info"
login_manager.init_app(app)
headers = { 'content-type': "application/x-www-form-urlencoded" }
db.init_app(app)
bcrypt = Bcrypt(app)

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(siteuser, int(user_id))

# Декоратор для защиты маршрутов JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-tokens')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = siteuser.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(current_user, *args, **kwargs)

    return decorated

# Главная страница
@app.route('/')
@login_required
def index():
    errors = Error.query.all()
    return render_template('index.html', errors=errors)

@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': f'Welcome {current_user.username}!'})

# Страница добавления новой ошибки (GET для отображения формы)
@app.route('/add_error', methods=['GET'])
@login_required
def add_error_page():
    if not current_user.is_admin:
        flash("Only admins can add errors.")
        return redirect(url_for('index'))
    
    return render_template('add_error.html')

# Маршрут для обработки формы добавления новой ошибки (POST для отправки данных)
@app.route('/add_error', methods=['POST'])
@login_required
def add_error():
    if not current_user.is_admin:
        flash("Only admins can add errors.")
        return redirect(url_for('index'))
    
    code = request.form['code']
    errtext = request.form['errtext']
    recommendation = request.form['recommendation']
    obj = request.form['obj']
    
    new_error = Error(code=code, errtext=errtext, recommendation=recommendation, obj=obj)
    db.session.add(new_error)
    db.session.commit()
    
    flash('Error added successfully!')
    return redirect(url_for('index'))


@app.route('/delete/<int:id>', methods=['POST'])
@login_required
def delete_error(id):
    error = Error.query.get_or_404(id)
    db.session.delete(error)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_error(id):
    if not current_user.is_admin:
        flash("Only admins can edit errors.")
        return redirect(url_for('index'))
    error = Error.query.get_or_404(id)
    if request.method == 'POST':
        error.code = request.form['code']
        error.errtext = request.form['errtext']
        error.recommendation = request.form['recommendation']
        error.obj = request.form['obj']
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('edit.html', error=error)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        is_admin = 'is_admin' in request.form  # Чекбокс для администратора
        
        # Проверка, существует ли пользователь
        if siteuser.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('register'))
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = siteuser(username=username, password=hashed_password, is_admin=is_admin)
        db.session.add(new_user)
        db.session.commit()
        
        flash('User registered successfully!')
        return redirect(url_for('index'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = siteuser.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            # Создание JWT токена
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.now(tz=timezone.utc) + timedelta(minutes=30)  # Токен будет действовать 30 минут
            }, app.config['SECRET_KEY'], algorithm="HS256")
            login_user(user)
            flash('Logged in successfully!')
            print("Токен:"+ " " + token)
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password')
            return redirect(url_for('login'))
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out!')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
