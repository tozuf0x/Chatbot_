from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta, timezone
from uuid import uuid4
from flask_login import UserMixin

from flask import Flask, current_app as app

db = SQLAlchemy()
#bcrypt = Bcrypt(app)
#jwt = JWTManager(app)

class Error(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(80), nullable=False)
    errtext = db.Column(db.String(200), nullable=False)
    recommendation = db.Column(db.String(200), nullable=False)
    obj = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Error {self.code}>'
    
class siteuser(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)  # role может быть 'user' или 'admin'