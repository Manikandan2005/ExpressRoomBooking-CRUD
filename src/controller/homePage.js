const homePage = (req,res)=>{
    res.status(200).send(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .content {
                    text-align: center;
                    max-width: 600px;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #007bff;
                }
                p {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="content">
                <h1>Welcome to the Hall Booking app!</h1>
                <p>
                    <h3>Features achieved using API</h3>
                    1. You can view all rooms data<br>
                    2. You Can create rooms<br>
                    3. You can book rooms<br>
                    4. You can view rooms booked<br>
                    5. You can view customer made bookings<br>
                    6. You can view customer's bookings count
                </p>
            </div>
        </body>
        </html>
    `
    )
}

export default{
    homePage
}