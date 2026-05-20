import { publicClient, RX, prescriptionDispenseAbi as rxAbi  } from "../chain";

export const readRx = async (tokenId: bigint) => {
    const contract = await publicClient.readContract({
        address: RX, abi: rxAbi, functionName: 'getPrescription', args: [tokenId],
    });

    console.log('contract: ', contract);

    return contract;
}
