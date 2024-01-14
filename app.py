#-*- coding: utf8 -*-
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
csrf = CSRFProtect(app)
csrf.init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:epfub76**@localhost/Errors'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'kb0*s1p(4cru)e+z*@4y!4v6$q1d)v61-gg$(lh7e*0o6$xp)_'
db = SQLAlchemy(app)
app.app_context().push()

login_manager = LoginManager(app)
login_manager.login_view = 'login'

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    pass

@login_manager.user_loader
def load_user(user_id):
    return Users()

class Errors(db.Model):
    errorID = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(10), nullable=False)
    errtext = db.Column(db.String(100), nullable=False)
    recommendation = db.Column(db.String(100))
    obj = db.Column(db.String(50))
db.create_all()

class ErrorForm(FlaskForm):
    code = StringField('Code', validators=[DataRequired()])
    errtext = StringField('Error Text', validators=[DataRequired()])
    recommendation = StringField('Recommendation')
    obj = StringField('Object')

@app.route('/')
@login_required
def index():
    errors = Errors.query.all()
    return render_template('index.html', errors=errors)

@app.route('/add', methods=['GET', 'POST'])
@login_required
def add_error():
    form = ErrorForm()
    if form.validate_on_submit():
        new_error = Errors(
            code=form.code.data,
            errtext=form.errtext.data,
            recommendation=form.recommendation.data,
            obj=form.obj.data
        )
        db.session.add(new_error)
        db.session.commit()
        flash('Error added successfully', 'success')
        return redirect(url_for('index'))
    return render_template('add_error.html', form=form)

@app.route('/edit', methods=['GET', 'POST'])
@csrf.exempt
@login_required
def edit_error():
    if request.method == 'POST':
        # Assuming 'error_ids' is the name attribute of the checkboxes
        selected_error_ids = request.form.getlist('error_ids')

        if len(selected_error_ids) != 1:
            flash('Please select exactly one error to edit', 'warning')
            return redirect(url_for('index'))

        error_to_edit = Errors.query.get(selected_error_ids[0])

        if not error_to_edit:
            flash('Error not found for editing', 'warning')
            return redirect(url_for('index'))

        form = ErrorForm(obj=error_to_edit)

        if form.validate_on_submit():
            error_to_edit.code = form.code.data
            error_to_edit.errtext = form.errtext.data
            error_to_edit.recommendation = form.recommendation.data
            error_to_edit.obj = form.obj.data

            db.session.commit()
            flash('Error updated successfully', 'success')
            return redirect(url_for('index'))

    else:
        flash('Invalid request method for editing', 'warning')
        return redirect(url_for('index'))

    return render_template('edit_error.html', form=form, error=error_to_edit)

@app.route('/delete', methods=['POST'])
@csrf.exempt
@login_required
def delete_errors():
    error_ids = request.form.getlist('error_ids')
    if not error_ids:
        flash('No errors selected for deletion', 'danger')
    else:
        Errors.query.filter(Errors.errorID.in_(error_ids)).delete(synchronize_session='fetch')
        db.session.commit()
        flash('Errors deleted successfully', 'success')
    return redirect(url_for('index'))

@app.route('/login', methods=['GET', 'POST'])
@csrf.exempt
def login():
        #user = Users.query.filter_by(username=username).first()

        #if user and check_password_hash(user.password_hash, password):
            # If the username and password are correct, generate a JWT token
            #login_user(user)
            #token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])
            #return jsonify({'token': token}), 200
        #else:
            #flash('Invalid login credentials', 'danger')
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == 'admin' and password == 'admin_password':
            user = Users()
            login_user(user)
            token = jwt.encode({'user_id': 1, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.config['SECRET_KEY'])
            return {'token': token}
        else:
            flash('Invalid login credentials', 'danger')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully', 'success')
    return redirect(url_for('login'))

if __name__ == '__main__':
    #with app.app_context():
        #db.create_all()
    app.run(debug=True)
