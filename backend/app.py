from flask import Flask, make_response, jsonify, request, Response
from flask_migrate import Migrate
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from models import db, User, Driver, Customer, Ride, Review

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///uber.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '987654'
db.init_app(app)
migrate = Migrate(app, db, render_as_batch=True)
api = Api(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
ma.init_app(app)
CORS(app)

@app.route('/')
def home():
    return ' Welcome to Uber-taxified !!!'

class CustomerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Customer

customer_schema = CustomerSchema()

class DriverSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Driver

Driver_schema = DriverSchema()

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User

User_schema = UserSchema()

class RideSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Ride

Ride_schema = RideSchema() 

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review

Review_schema = ReviewSchema()

class Registration(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('email', type=str, help='Email of the user', required=True)
    post_args.add_argument('password', type=str, help='Password of the user', required=True)

    def post(self):
        args = self.post_args.parse_args()

        existing_user = User.query.filter_by(email=args['email']).first()
        if existing_user:
            return {"Error": "User with this email already exists"}, 400

        
        new_user = User(email=args['email'])
        new_user.set_password(args['password'])

        
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201

api.add_resource(Registration, '/register')

class Login(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('email', type=str, help='Email of the user', required=True)
    post_args.add_argument('password', type=str, help='Password of the user', required=True)

    def post(self):
        args = self.post_args.parse_args()

        user = User.query.filter_by(email=args['email']).first()

        if user and user.check_password(args['password']):
            access_token = create_access_token(identity=user.id)
            return {'access_token': access_token}, 200
        else:
            return {'Error': 'Invalid credentials'}, 401

api.add_resource(Login, '/login')

class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        return {'message': f'You are authenticated as user {current_user_id}'}, 200

api.add_resource(ProtectedResource, '/protected')

class Customers(Resource):
    def get(self):
        customer = Customer.query.all()
        res = customer_schema.dump(customer,many = True)

        response = make_response(
            jsonify(res),
            200
        )

        return response
api.add_resource(Customers, '/customer')

class Customer_by_id(Resource):
    def get(self, id):
        customer = Customer.query.get(id)

        if customer is None:
            return {"Error": "Customer not found"}, 404

        rides = Ride.query.filter_by(customer_id=id).all()
        rides_data = [Ride_schema.dump(ride) for ride in rides]

        customer_data = customer_schema.dump(customer)
        customer_data["rides"] = rides_data

        return customer_data, 200

api.add_resource(Customer_by_id, '/customer/<int:id>')

class Drivers(Resource):
    def get(self):
        driver = Driver.query.all()
        res = Driver_schema.dump(driver,many = True)

        response = make_response(
            jsonify(res),
            200
        )

        return response
api.add_resource(Drivers, '/driver')

class Drivers_by_id(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('first_name', type=str, help='First name of the driver', required=True)
    post_args.add_argument('last_name', type=str, help='Last name of the driver', required=True)
    post_args.add_argument('location', type=str, help='Location of the driver', required=True)
    post_args.add_argument('vehicle_type', type=str, help='Type of vehicle the driver uses', required=True)

    def get(self, id):
        driver = Driver.query.filter_by(id=id).first()

        if driver is None:
            return {"Error": "Driver not found"}, 404

        rides = Ride.query.filter_by(driver_id=id).all()
        rides_data = [Ride_schema.dump(ride) for ride in rides]

        customers_data = []
        for ride in rides:
            customer = Customer.query.get(ride.customer_id)
            if customer:
                customers_data.append(customer_schema.dump(customer))

        driver_data = Driver_schema.dump(driver)
        driver_data["rides"] = rides_data
        driver_data["customers"] = customers_data

        # Return the JSON data directly
        return jsonify(driver_data), 200



    def delete(self, id):
        driver = Driver.query.filter_by(id=id).first()

        if driver is None:
            return {"Error": "Driver not found"}, 404

        # Delete associated rides
        Ride.query.filter_by(driver_id=id).delete()

        # Delete the driver
        db.session.delete(driver)
        db.session.commit()

        return {"message": "Driver deleted successfully"}, 200

    def post(self, id):
        args = self.post_args.parse_args()

        new_driver = Driver(
            user_id=id,
            first_name=args['first_name'],
            last_name=args['last_name'],
            location=args['location'],
            vehicle_type=args['vehicle_type']
        )

        db.session.add(new_driver)
        db.session.commit()

        return {"message": "Driver created successfully"}, 201

api.add_resource(Drivers_by_id, '/driver/<int:id>')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
