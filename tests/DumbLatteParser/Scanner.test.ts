import DumbTag from "../../src/DumbLatteParser/Scanner/DumbTag"
import { Scanner } from "../../src/DumbLatteParser/Scanner/Scanner"
import { RegionType } from "../../src/DumbLatteParser/Scanner/types"
import { readDataFile } from "../utils"


test('Test basic scanner properties', () => {
	const scanner = new Scanner(readDataFile('justString.txt'))
	// Nice little trick with array access - gives us access to private fields
	// of the Scanner object.
	const state = scanner['state']

	expect(state.offset).toBe(-1)
	expect(state.line).toBe(0)
	expect(state.character).toBe(-1)
	expect(state.lastLatteOpenTagOffset).toBe(0)
	expect(state.maxOffset).toBe(47)

	const result = scanner.scan()
	expect(Array.isArray(result)).toBeTruthy()
	expect(result).toHaveLength(0)

	expect(state.offset).toBe(47)
	expect(state.character).toBe(11)
	expect(state.line).toBe(3)
	expect(state.lastLatteOpenTagOffset).toBe(0)
	expect(state.maxOffset).toBe(47)
})


test('Simple template scan', (t) => {
	const scanner = new Scanner(readDataFile('simple.latte'))
	const result = scanner.scan()

	const expected = [
		new DumbTag(
			'var $prvni',
			{
				start: {line: 0, character: 0, offset: 0},
				end: {line: 0, character: 11, offset: 11},
			},
			RegionType.LATTE,
		),
		new DumbTag(
			'var bool $druhy',
			{
				start: {line: 1, character: 0, offset: 13},
				end: {line: 1, character: 16, offset: 29},
			},
			RegionType.LATTE,
		),
		new DumbTag(
			'varType \\MyNamespace\\MyClass $treti',
			{
				start: {line: 1, character: 17, offset: 30},
				end: {line: 1, character: 53, offset: 66},
			},
			RegionType.LATTE,
		),
		new DumbTag(
			'$prvni',
			{
				start: {line: 2, character: 9, offset: 77},
				end: {line: 2, character: 16, offset: 84},
			},
			RegionType.LATTE,
		),
		new DumbTag(
			'$druhy',
			{
				start: {line: 2, character: 18, offset: 86},
				end: {line: 2, character: 25, offset: 93},
			},
			RegionType.LATTE,
		),
		new DumbTag(
			'default $ctvrty = 4',
			{
				start: {line: 3, character: 0, offset: 101},
				end: {line: 3, character: 20, offset: 121},
			},
			RegionType.LATTE,
		),
		new DumbTag(
			'default int|float $paty = 5',
			{
				start: {line: 3, character: 21, offset: 122},
				end: {line: 3, character: 49, offset: 150},
			},
			RegionType.LATTE,
		),
	]

	expect(result).toMatchObject(expected)
})

test('Smoke test of real template scan', (t) => {
	const scanner = new Scanner(readDataFile('real.latte'))
  	expect(Array.isArray(scanner.scan())).toBeTruthy()
}, 10000)
