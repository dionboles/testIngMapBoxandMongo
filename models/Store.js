const mongosee = require("mongoose");
const geocoder = require("../utils/gecoder");
const StoreSchema = new mongosee.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique : true,
        trim: true,
        maxlength: [10, "Store ID must be less then 10 chars"]
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress : String,
        city : String,
    },
    createdAT:{
        type: Date,
        default: Date.now
    }
});


// Geocoder & create location 
StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type : 'Point',
        coordinates : [
            loc[0].longitude,
            loc[0].latitude
        ],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city
    }
    // Do not save address 
    this.address = undefined;
    next();
})
module.exports = mongosee.model("Store",StoreSchema);