import { BalancedCaptureResult } from './types'

/**
 * Starts scanning of the input string at specified offset and returns
 * content and offset (inside the input string) between two specified delimiters
 * that are found following the starting offset.
 *
 * For example "hello how {? are you}" with starting offset 3 (well before the
 * first delimiter) will return "? are you" with offset 11 (right after the
 * first delimiter).
 */
export function captureBalanced(
	delimiter: [string, string],
	input: string,
	startOffset: number,
): BalancedCaptureResult | null {
	let offset = startOffset
	let maxOffset = input.length - 1

	// We're going to ignore right delimiters until we've found the left one
	// first.
	let foundLeftDel: boolean = false
	let insideStartOffset: number | null = null
	const leftDel: string = delimiter[0]
	const rightDel: string = delimiter[1]

	if (leftDel.length !== 1 || rightDel.length !== 1) {
		throw new Error('Both delimiters must be single-charater strings')
	}

	let counter = 0

	while (offset <= maxOffset) {
		const char = input[offset]

		if (char === leftDel) {
			if (!foundLeftDel) {
				insideStartOffset = offset + 1
			}
			foundLeftDel = true
			counter++
		}

		if (foundLeftDel && char === rightDel) {
			counter--
			if (counter === 0) {
				return {
					content: input.substring(insideStartOffset!, offset),
					offset: insideStartOffset!,
				} as BalancedCaptureResult
			}
		}

		offset++
	}

	if (counter) {
		// Found left delimiter, but there's not a matching pair.
		return null
	}

	return null
}
