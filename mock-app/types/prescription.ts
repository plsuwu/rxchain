interface IPrescription {
	patientId: string;
	prescriberId: string;
    
    // perhaps we use e.g. Pubchem CID + manufacturer; 
    // (e.g 
    //      Propranolol Hydrochloride 10mg manufactured by APO:
    //          - CID:          62882 
    //          - manufacturer: APO
    //      
    //
    //      
	medicationId: string;

    // total number of repeats initially prescribed
	repeatsTotal: string;

	// number of times this prescription has been dispensed
	timesDispensed: string;

	// u64 - unix timestamp perhaps
	expiryTimestamp: number;
}
