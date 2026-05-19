export const RXCHAIN_ROLE = {
	prescriber: "prescriber",
	dispenser: "dispenser",
	regulator: "regulator",
	patient: "patient",
} as const;

export type RxchainRole = (typeof RXCHAIN_ROLE)[keyof typeof RXCHAIN_ROLE];
