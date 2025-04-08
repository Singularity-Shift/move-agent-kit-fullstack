import axios from "axios"
import type { AgentRuntime } from "../../agent"

/**
 * Price token in panora
 * @param agent MoveAgentKit instance
 * @param tokenAddress Address of the token to get prices for
 * @returns Prices for the specified token
 */
export async function priceWithPanora(agent: AgentRuntime, tokenAddress: string): Promise<string> {
	try {
		const url = "https://api.panora.exchange/prices"

		const panoraApiKey = agent.config.PANORA_API_KEY
		if (!panoraApiKey) {
			throw new Error("No PANORA_API_KEY in config")
		}

		const res = await axios.get(url, {
			headers: {
				"x-api-key": panoraApiKey,
			},
			params: {
				tokenAddress,
			},
		})
		const response = await res.data

		return response
	} catch (error: any) {
		throw new Error(`Token price failed: ${error.message}`)
	}
}
