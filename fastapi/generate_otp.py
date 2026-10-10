from fastapi import APIRouter, HTTPException
from random import randint
from email.message import EmailMessage
import smtplib

from database import users, otp_collection
from models import LoginRequest


router = APIRouter()


# Gmail account that sends the OTP
SENDER_EMAIL = "schoolmanagementsystum@gmail.com"

# Google App Password
SENDER_PASSWORD = "ubur inqn dmtq pieg".replace(" ", "")


@router.post("/login")
def login(data: LoginRequest):

    # Check username and email
    user = users.find_one({
        "username": data.username,
        "email": data.email
    })

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Username or email is incorrect"
        )

    # Generate OTP
    otp = str(randint(100000, 999999))

    # Remove previous OTP
    otp_collection.delete_many({
        "email": data.email
    })

    # Save OTP
    otp_collection.insert_one({
        "email": data.email,
        "otp": otp
    })

    # Create email
    message = EmailMessage()

    message["Subject"] = "School Management System - Login OTP"
    message["From"] = SENDER_EMAIL
    message["To"] = data.email

    message.set_content(
        f"""
Hello {data.username},

Your login OTP is:

{otp}

Please enter this OTP in the School Management System.

Thank you.
"""
    )

    # Send email
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:

            server.starttls()

            server.login(
                SENDER_EMAIL,
                SENDER_PASSWORD
            )

            server.send_message(message)

    except Exception as e:

        print("================================")
        print("EMAIL ERROR:")
        print(str(e))
        print("================================")

        raise HTTPException(
            status_code=500,
            detail="Email sending failed"
        )

    return {
        "message": "OTP sent successfully"
    }