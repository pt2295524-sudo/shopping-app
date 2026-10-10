from fastapi import APIRouter, HTTPException

from database import users, otp_collection
from models import VerifyOTPRequest


router = APIRouter()


@router.post("/verify-otp")
def verify_otp(data: VerifyOTPRequest):

    # Find OTP using email
    otp_data = otp_collection.find_one({
        "email": data.email
    })

    # OTP not found
    if not otp_data:
        raise HTTPException(
            status_code=404,
            detail="OTP not found"
        )

    # Check OTP
    if otp_data["otp"] != data.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    # Delete OTP after successful verification
    otp_collection.delete_one({
        "_id": otp_data["_id"]
    })

    # Find student
    user = users.find_one(
        {"email": data.email},
        {"_id": 0}
    )

    # Student not found
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "Login Successful",
        "user": user
    }