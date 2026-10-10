from pydantic import BaseModel


# Login data
class LoginRequest(BaseModel):
    username: str
    email: str


# OTP verification data
class VerifyOTPRequest(BaseModel):
    email: str
    otp: str