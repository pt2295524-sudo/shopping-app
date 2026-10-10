from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from generate_otp import router as login_router
from verify_otp import router as verify_router


app = FastAPI()


# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Login API
app.include_router(login_router)

# OTP verification API
app.include_router(verify_router)


@app.get("/")
def home():

    return {
        "message": "School Management System API Running"
    }