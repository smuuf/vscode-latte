import { KeyObject } from 'crypto'

/**
 * Returns true if the first argument A has "instanceof B" evaluated as true
 * with any of the Bs passed as the rest of the arguments.
 */
export function isInstanceOf(subject: object, ...types: any[]): boolean {
	return types.some((type) => subject instanceof type)
}

export function isString(subject: any): boolean {
	return typeof subject === 'string' || subject instanceof String
}

export function isObject(obj: any): boolean {
	return obj != null && obj.constructor.name === 'Object'
}

/**
 * Makes TS think/know the subject is now of type T.
 */
export function narrowType<T>(subject: any): asserts subject is T {}

export function dump(thing: any): void {
	console.dir(thing, { depth: 10 })
}

/**
 * Takes an iterable containing strings and returns a sum of their lengths.
 */
export function sumStringLength<T>(items: Iterable<string>): integer {
	return [...items].reduce((acc: integer, cur: string): integer => cur.length, 0)
}

export function filterMap<K, V>(
	map: Map<K, V>,
	predicate: (k: K, v: V) => boolean,
): Map<K, V> {
	return new Map([...map].filter((item) => predicate(...item)))
}

export function mapMap<K, V, RV>(map: Map<K, V>, fn: (k: K, v: V) => RV): Map<K, RV> {
	return new Map(Array.from(map, ([key, value]) => [key, fn(key, value)]))
}

export function mapSet<V, RV>(set: Set<V>, fn: (v: V) => RV): Set<RV> {
	return new Set(Array.from(set, (v) => fn(v)))
}

export function wrapString(str: string, beforeAfter: [string, string]): string {
	return `${beforeAfter[0]}${str}${beforeAfter[1]}`
}

/**
 * Try to find a regex match at precisely the specified offset.
 */
export function matchRegexAtIndex(
	regex: string | RegExp,
	subject: string,
	index: integer,
): RegExpExecArray | null {
	// If we got a Regexp object, make our own copy, so the original's object
	// lastIndex is not potentially mutated by us.
	if (!isString(regex)) {
		narrowType<RegExp>(regex)
		regex = regex.source
	}

	regex = new RegExp(regex, 'y') // "y" flag makes the regex match precisely at lastIndex.
	regex.lastIndex = index
	return regex.exec(subject)
}

/**
 * Try to find the regex first match from the specified offset.
 */
export function matchRegexFromIndex(
	regex: string | RegExp,
	subject: string,
	index: integer,
): RegExpExecArray | null {
	// If we got a Regexp object, make our own copy, so the original's object
	// lastIndex is not potentially mutated by us.
	if (!isString(regex)) {
		narrowType<RegExp>(regex)
		regex = regex.source
	}

	regex = new RegExp(regex, 'g')
	regex.lastIndex = index
	return regex.exec(subject)
}
