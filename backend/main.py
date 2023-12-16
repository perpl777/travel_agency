from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2


app = FastAPI(title="My App", docs_url="/documentation", redoc_url=None)

# middleware для разрешения CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
    allow_headers=['Content-Type'],
)



# Модели данных
class Tours(BaseModel):
    tour_name: str
    price: float
    city_id: int
    arrival_date: str
    departure_date: str
    country: str

class City(BaseModel):
    city_name: str
    excursion_program_id: int
    hotel_id: int
    guide_id: int

class Excursions(BaseModel):
    excursion_name: str
    description: str

class Hotels(BaseModel):
    hotel_name: str
    classhotel: str
    photo: str

class Guides(BaseModel):
    guide_name: str
    phone_number: str
@app.get("/tour")
async def get_tour_by_date_and_country(date: str, country: str):
    try:
        conn = psycopg2.connect(
            dbname="destination",
            user="perpl",
            password="123",
            host="localhost"
        )
        cursor = conn.cursor()

        cursor.execute("""
            SELECT tours.tour_name, tours.price, tours.city_id, tours.arrival_date, tours.departure_date, tours.country,
                    city.city_name, city.excursion_program_id, city.hotel_id, city.guide_id,
                    excursions.excursion_name, excursions.description,
                    hotels.hotel_name, hotels.classhotel, hotels.photo,
                    guides.guide_name, guides.phone_number
            FROM tours
            INNER JOIN city ON tours.city_id = city.id
            INNER JOIN excursions ON city.excursion_program_id = excursions.id
            INNER JOIN hotels ON city.hotel_id = hotels.id
            INNER JOIN guides ON city.guide_id = guides.id
            WHERE tours.arrival_date >= %s AND tours.country = %s
        """, (date, country))
        tour_data = cursor.fetchall()

        if tour_data:
            tours = []
            for row in tour_data:
                tour = Tours(
                    tour_name=row[0],
                    price=row[1],
                    city_id=row[2],
                    arrival_date=row[3],
                    departure_date=row[4],
                    country=row[5]
                )
                city = City(
                    city_name=row[6],
                    excursion_program_id=row[7],
                    hotel_id=row[8],
                    guide_id=row[9]
                )
                excursions = Excursions(
                    excursion_name=row[10],
                    description=row[11]
                )
                hotels = Hotels(
                    hotel_name=row[12],
                    classhotel=str(row[13]),
                    photo=row[14]
                )
                guides = Guides(
                    guide_name=row[15],
                    phone_number=row[16]
                )
                tour_dict = {"tour": tour, "city": city, "excursions": excursions, "hotels": hotels, "guides": guides}
                tours.append(tour_dict)

            return tours

        else:
            return {"message": "Tour not found"}

    except Exception as e:
        return {str(e)}

    finally:
        cursor.close()
        conn.close()


# Модель данных для регистрации пользователя
class UserRegistration(BaseModel):
    name: str
    surname: str
    patronymic: str
    date_of_birth: str
    email: str
    phone_number: str
    password: str
    passport_issued_by: str
    passport_issue_date: str
    passport_series: str
    passport_number: str

@app.post("/register")
async def register_user(user_data: UserRegistration):
    # Подключение к базе данных
    conn = psycopg2.connect(
        dbname="destination",
        user="perpl",
        password="123",
        host="localhost"
    )
    cursor = conn.cursor()
    
    try:
        # Выполнение запроса на добавление нового пользователя в базу данных
        cursor.execute("INSERT INTO users (name, surname, patronymic, date_of_birth, email, phone_number, password) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id", (user_data.name, user_data.surname, user_data.patronymic, user_data.date_of_birth, user_data.email, user_data.phone_number, user_data.password))
        user_id = cursor.fetchone()[0]  # Получаем ID только что созданного пользователя
        
        # Выполнение запроса на добавление паспортных данных пользователя в отдельную таблицу
        cursor.execute("INSERT INTO passport_data (user_id, passport_issued_by, passport_issue_date, passport_series, passport_number) VALUES (%s, %s, %s, %s, %s)", (user_id, user_data.passport_issued_by, user_data.passport_issue_date, user_data.passport_series, user_data.passport_number))
        
        # Подтверждение изменений и закрытие соединения
        conn.commit()
        
        return {"message": "User registered successfully"}
    
    except Exception as e:
        # Если произошла ошибка, откатываем изменения и возвращаем сообщение об ошибке
        conn.rollback()
        return {"message": "Error occurred while registering user"}

    finally:
        # Закрываем соединение с базой данных
        cursor.close()
        conn.close()





# Модель данных для пользователя
class User(BaseModel):
    name: str
    surname: str
    patronymic: str
    date_of_birth: str
    email: str
    phone_number: str
    password: str

# Модель данных для паспортных данных
class PassportData(BaseModel):
    user_id: int
    passport_issued_by: str
    passport_issue_date: str
    passport_series: str
    passport_number: str

# Функция для поиска пользователя по электронной почте и паролю
@app.get("/login")
async def get_user_by_email_and_password(email: str, password: str):
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(
            dbname="destination",
            user="perpl",
            password="123",
            host="localhost"
        )
        cursor = conn.cursor()
        
        # Выполнение запроса на поиск пользователя по электронной почте и паролю
        cursor.execute("""
            SELECT users.name, users.surname, users.patronymic, users.date_of_birth, users.email, users.phone_number, users.password,
                passport_data.passport_issued_by, passport_data.passport_issue_date, passport_data.passport_series, passport_data.passport_number
            FROM users
            INNER JOIN passport_data ON users.id = passport_data.user_id
            WHERE users.email = %s AND users.password = %s
        """, (email, password))
        user_data = cursor.fetchone()
        
        # Если пользователь найден, формируем объекты User и PassportData
        if user_data:
            user = User(
                name=user_data[0],
                surname=user_data[1],
                patronymic=user_data[2],
                date_of_birth=user_data[3],
                email=user_data[4],
                phone_number=user_data[5],
                password=password
            )
            passport = PassportData(
                user_id=user_data[6],
                passport_issued_by=user_data[7],
                passport_issue_date=user_data[8],
                passport_series=user_data[9],
                passport_number=user_data[10]
            )
            return {"user": user, "passport": passport}
        
        else:
            return {"message": "User not found"}
    
    except Exception as e:
        # Если произошла ошибка, возвращаем сообщение об ошибке
        return {"message": "Error occurred while fetching user"}

    finally:
        # Закрываем соединение с базой данных
        cursor.close()
        conn.close()



class Flight(BaseModel):
    date: str
    departure_time: str
    arrival_time: str
    departure_location: str
    arrival_location: str
    airplane_name: str

@app.get("/flights/{tour_id}")
async def get_flight_by_tour_id(tour_id: int):
    try:
        conn = psycopg2.connect(
            dbname="destination",
            user="perpl",
            password="123",
            host="localhost"
        )
        cursor = conn.cursor()

        cursor.execute("""
            SELECT flight.date, flight.departure_time, flight.arrival_time,
                    flight.departure_location, flight.arrival_location, flight.airplane_name
            FROM flight
            INNER JOIN tour_flight ON flight.id = tour_flight.flight_id
            WHERE tour_flight.tour_id = %s
        """, (tour_id,))
        flight_data = cursor.fetchall()

        if flight_data:
            flights = []
            for row in flight_data:
                flight = Flight(
                    date=str(row[0]),
                    departure_time=str(row[1]),
                    arrival_time=str(row[2]),
                    departure_location=row[3],
                    arrival_location=row[4],
                    airplane_name=row[5]
                )
                flights.append(flight)

            return {"flights": flights}
        else:
            return {"message": "Flight not found"}

    except Exception as e:
        return {str(e)}

    finally:
        cursor.close()
        conn.close()



# Модель данных
class UserTour(BaseModel):
    users_id: int
    tours_id: int

@app.post("/buy")
async def create_user_tour(user_tour: UserTour):
    try:
        conn = psycopg2.connect(
            dbname="destination",
            user="perpl",
            password="123",
            host="localhost"
        )
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO user_tour (users_id, tours_id)
            VALUES (%s, %s)
        """, (user_tour.users_id, user_tour.tours_id))

        conn.commit()

        return {"message": "User tour created successfully"}

    except Exception as e:
        return {"message": "Error occurred while creating user tour"}

    finally:
        cursor.close()
        conn.close()
