// Only run on server (never exposed to clients so can use sensitive data)

// The API for the fee calculation returning an 'OK' status along with the value to display
export default function handler(req, res){
    if(req.method === 'POST'){

        var inputValue = req.body;
        var pence = Number.parseFloat(0);
        
        // Validate input (only lightly)
        if(!inputValue.isNaN()){

            Math.floor(inputValue);

            if(0 < inputValue < 100000){
                (pence = inputValue*100)*0.0075
            }
            else if(inputValue >= 100000){
                (pence = inputValue*100)*0.0056
            }

            // format to 2 d.p. 
            var formatPence = Number.parseFloat(pence/100).toFixed(2);

        }

        // Code for 'OK' status
        res.status(200).json({message: formatPence});
    }
}

