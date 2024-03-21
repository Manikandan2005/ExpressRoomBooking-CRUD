import {format} from 'date-fns'
//creating a sample rooms data array
const rooms = [
    {
        roomid:1,
        roomname:"Room 1",
        seatsavailable:4,
        amenities:"TV,Fridge,AC",
        priceperhour:200,
        status:"Available"
    },
    {
        roomid:2,
        roomname:"Room 2",
        seatsavailable:4,
        amenities:"TV,Fridge,AC,Balcony,SwimmingPool",
        priceperhour:300,
        status:"Booked"
    },
    {
        roomid:3,
        roomname:"Room 3",
        seatsavailable:2,
        amenities:"TV,Fridge,AC,WashingMachine",
        priceperhour:250,
        status:"Available"
    },
]

let bookedRooms = [{
    custname:"RameshKumar",
    date:"12-2-24",
    starttime:"12PM",
    endtime:"12AM",
    roomID:2,
    roomname:"Room 2",
    status:"Booked"
}]
const getAllRooms = async(req,res)=>{
    try{
        await res.status(200).send(rooms)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
}

const createRooms = async(req,res)=>{
    try{

        //getting all rooms data
        let id = rooms.length?rooms[rooms.length-1].roomid+1:1
        req.body.roomid = id
        rooms.push(req.body)
        await res.status(200).send({
            message:"Room Created Successfully",
            rooms
        })
    }
    catch(error){
            res.status(500).send({
            message:"Not able to add room"
        })
    }
}

const bookRooms = async(req,res)=>{

    //booking rooms by receiving the booking data from the request body
    let {custname,starttime,endtime,roomID}=req.body
    try{
        let date = format(new Date(),"dd-MM-yyyy")
        req.body.date = date

        //checking whether the room is available with the requested roomid and status of the room
        let roomcheck = rooms.filter((e)=>e.status==="Available" && e.roomid === roomID)
            let bookings = {
                custname,
                starttime,
                endtime,
                date,
                bookingid:bookedRooms.length + 1,
                roomID,
                roomname:rooms.roomname,
                status:rooms.status
            }
            //pushing the booked rooms data to an array
            bookedRooms.push(bookings)

            //changing the status of the room available to booked once it is booked
            if(roomcheck.length!==0)
            {
                for(let i=0;i<rooms.length;i++)
                {
                    if(rooms[i].roomid===roomID)
                    {
                        rooms[i].status = "Booked"
                    }
                }
                res.status(200).send({
                    message:"Room Booked Successfully",
                    bookedRooms,
                    rooms
                })
            }
            else{
                res.status(400).send({
                    message:"Requested Room is Booked Already"
                })
            }

     


    }
    catch(error){
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const roomBookedData = async(req,res)=>{
    try{
        
       let bookedData = []
       for(let i=0;i<rooms.length;i++)
       {
        if(rooms[i].status==="Booked") //checking for booked rooms
        {
            //to get the roomname from rooms array getting the matching room with the bookedroomid to display the roomname
            let bookedroomdata = bookedRooms.filter((e)=>e.roomID === rooms[i].roomid) 
              let temp ={ RoomName:rooms[i].roomname,
                Status:rooms[i].status,
                CustomerName:bookedroomdata[0].custname,
                Date:bookedroomdata[0].date,
                StartTime:bookedroomdata[0].starttime,
                EndTime:bookedroomdata[0].endtime
              }
              bookedData.push(temp)
        }
       }

       res.status(200).send({
        message:"Booked Rooms Data Fetched Successfully",
        bookedData
       })
       
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const custBookedData = (req,res)=>{
    try{
        let BookedCustomer = []
        for(let i=0;i<rooms.length;i++)
       {
        if(rooms[i].status==="Booked") //checking for booked rooms
        {
            //to get the roomname from rooms array getting the matching room with the bookedroomid to display the roomname
            let bookedCustData = bookedRooms.filter((e)=>e.roomID === rooms[i].roomid)
                let temp ={ 
                CustomerName:bookedCustData[0].custname,
                RoomName:rooms[i].roomname,
                Date:bookedCustData[0].date,
                StartTime:bookedCustData[0].starttime,
                EndTime:bookedCustData[0].endtime
              }
                BookedCustomer.push(temp)
        }
       }

       res.status(200).send({
        message:"Booked Customers Data Fetched Successfully",
        BookedCustomer
       })
    }

    catch(error){
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

const custCountBooked = (req,res)=>{
    try{
        //getting the customer name from body and to check it with bookedrooms data to get the count of boookings
        let {customername} = req.body
        let custdata = bookedRooms.map((e)=>{
            if(e.custname === customername)
            {
                return {
                    customerName:e.custname,
                    RoomName:e.roomname,
                    Date:e.date,
                    StartTime:e.starttime,
                    EndTime:e.endtime,
                    BookingID:e.bookingid,
                    BookingDate:e.date,
                }
            }
        })

        let count = custdata.length // to get the count of customer's bookings

        res.status(200).send({
            message:"Customer Bookings Count Fetched Successfully",
            BookingsCount:count,
            custdata 
        })
    }
    catch(error){
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}


export default{
    getAllRooms,
    createRooms,
    bookRooms,
    custBookedData,
    roomBookedData,
    custCountBooked,
}