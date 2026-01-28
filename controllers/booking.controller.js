const Booking = require("../models/Booking.model");

const getAllBooking = async (req, res) => {
  try {
    // Populate will only work if the models 'Service' and 'Package' are registered
    const booking = await Booking.find()
      .populate("service", "title price duration")
      .populate("package", "package_name");

    res.status(200).json({
      success: true,
      count: booking.length,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { client_name, phone, service, package, description, status } = req.body;
    if (!client_name || !phone || !service || !package || !status) {
      return res.status(400).json({
        success: false,
        message: "The field are required",
      });
    }

    const booking = await Booking.create({
      client_name: client_name,
      phone: phone,
      service: service,
      package: package,
      description : description,
      status: status,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createBookingFronte = async (req, res) => {
  try {
    const { client_name, phone, service,package, description , booking_date , booking_time} = req.body;
    if (!client_name || !phone || !service || !package || !booking_date || !booking_time) {
      return res.status(400).json({
        success: false,
        message: "The field are required",
      });
    }

    const booking = await Booking.create({
      client_name: client_name,
      phone: phone,
      service: service,
      package : package,
      description : description,
      booking_date : booking_date,
      booking_time : booking_time
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("service", "price title")
      .populate("package", "package_name price");
    if(!booking){
        return res.status(404).json({
            success : false,
            message : 'booking not found'
        });
    }

    res.status(200).json({
        success : true,
        data : booking
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBooking = async(req , res) => {
    try{
        const {id} = req.params
        const booking = await Booking.findByIdAndDelete(id)
        if(!booking){
            return res.status(404).json({
                success : false,
                message : 'Booking not found'
            });
        }

        res.status(200).json({
            success : true,
            message :'booking delete successfully'
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = { getAllBooking, createBooking ,findBookingById , deleteBooking , createBookingFronte};
