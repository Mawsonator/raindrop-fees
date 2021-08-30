import Head from 'next/Head';
import FeesForm from '../components/FeesForm';

// Next js gunction for the fees page

export default function FeesPage(){
    
    // The handler function for the calculation, requesting data from the API
    async function calculateFeesHandler(feeValue){
        const response = await fetch('/api/calculate-fee', {
            method: 'POST',
            body: JSON.stringify(feeValue),
            headers: {
                'Content-Type': 'applcation/json'
            }
        });

        // Wait for the result of the calculation
        const data = await response.json();

        // Run a function to update the page content.
        updateMonthlyFee(data.message);
    }

    function updateMonthlyFee(response){
        document.getElementById('monthlyFeeText').innerHTML = response;
    }

    // Return the page
    return(
        <div>
            <Head>
                <title>Fees</title>
                <meta name="description" content="Raindrop fees calculator" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>We're keeping it simple</h1>
            <h2>At Raindrop, we understand you don't have time for complexity.</h2>
            <FeesForm onCalcFees={calculateFeesHandler}/>
            <p>Monthly fee of £
                <a id = "monthlyFeeText">
                </a>
            </p> 
        </div>
    
    )
}

// I feel this is required but would need more time to get this to work. 
// I think the issue is with the pages being pre-rendered so when I submit the form 
// to the server it can't read the input data, thus the getServerSideProps function 
// should be used to retrieve the data at runtime.
export async function getServerSideProps(context) {
    return {
        props: {
            
        }
    }
}
    