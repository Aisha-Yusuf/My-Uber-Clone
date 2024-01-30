from models import User, Driver, Customer, Ride, Review
from datetime import date, time
from app import app, db

def seed_data():
    # Create users with hashed passwords
    user1 = User(email='user1@example.com')
    user1.set_password('password1')

    user2 = User(email='user2@example.com')
    user2.set_password('password2')

    db.session.add_all([user1, user2])
    db.session.commit()

    # Create drivers and customers associated with users
    driver1 = Driver(user_id=user1.id, first_name='John', last_name='Doe', location='City A', vehicle_type='Car')
    driver2 = Driver(user_id=user2.id, first_name='Jane', last_name='Smith', location='City B', vehicle_type='Bus')
    db.session.add_all([driver1, driver2])
    db.session.commit()

    customer1 = Customer(user_id=user1.id, first_name='Alice', last_name='Johnson', location='City A')
    customer2 = Customer(user_id=user2.id, first_name='Bob', last_name='Williams', location='City B')
    db.session.add_all([customer1, customer2])
    db.session.commit()

    # Create rides associated with customers and drivers
    ride1 = Ride(customer_id=customer1.id, driver_id=driver1.id, date=date.today(), start_time=time(8, 0),
                 end_time=time(10, 0), pickup_location='Location A', drop_location='Location B', amount=25.0)
    ride2 = Ride(customer_id=customer2.id, driver_id=driver2.id, date=date.today(), start_time=time(9, 0),
                 end_time=time(11, 0), pickup_location='Location C', drop_location='Location D', amount=30.0)
    db.session.add_all([ride1, ride2])
    db.session.commit()

    # Create reviews associated with customers and drivers
    review1 = Review(comment='Great service!', customer_id=customer1.id, driver_id=driver1.id, rating=5)
    review2 = Review(comment='Excellent driver!', customer_id=customer2.id, driver_id=driver2.id, rating=4)
    db.session.add_all([review1, review2])
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        seed_data()
