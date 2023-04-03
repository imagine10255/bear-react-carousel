/* eslint-disable eqeqeq, indent */


function keys(obj: object, hasKey: (obj: object, key: string) => boolean) {
    var keys = [];
    for (var key in obj) {
        if (hasKey(obj, key)) {
            keys.push(key);
        }
    }
    return keys.concat(
        (Object.getOwnPropertySymbols(obj) as Array<any>).filter(
            symbol =>
                (Object.getOwnPropertyDescriptor(obj, symbol) as PropertyDescriptor)
                    .enumerable,
        ),
    );
}

function hasKey(obj: any, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function hasDefinedKey(obj: any, key: string) {
    return hasKey(obj, key) && obj[key] !== undefined;
}


function isDomNode(obj: any): boolean {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        typeof obj.nodeType === 'number' &&
        typeof obj.nodeName === 'string' &&
        typeof obj.isEqualNode === 'function'
    );
}


function isA(typeName: string, value: unknown) {
    return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
}

function isAsymmetric(obj: any) {
    return !!obj && isA('Function', obj.asymmetricMatch);
}

function asymmetricMatch(a: any, b: any) {
    var asymmetricA = isAsymmetric(a),
        asymmetricB = isAsymmetric(b);

    if (asymmetricA && asymmetricB) {
        return undefined;
    }

    if (asymmetricA) {
        return a.asymmetricMatch(b);
    }

    if (asymmetricB) {
        return b.asymmetricMatch(a);
    }
}


type Tester = (a: any, b: any) => boolean | undefined;


/**
 * 深比對物件
 * @param a
 * @param b
 * @param aStack
 * @param bStack
 * @param customTesters
 * @param hasKey
 */
const eq = (
    a: any,
    b: any,
    aStack: Array<unknown>,
    bStack: Array<unknown>,
    customTesters: Array<Tester>,
    hasKey: any,
): boolean => {

    customTesters = customTesters || [];

    var result = true;

    var asymmetricResult = asymmetricMatch(a, b);
    if (asymmetricResult !== undefined) {
        return asymmetricResult;
    }

    for (var i = 0; i < customTesters.length; i++) {
        var customTesterResult = customTesters[i](a, b);
        if (customTesterResult !== undefined) {
            return customTesterResult;
        }
    }

    if (a instanceof Error && b instanceof Error) {
        return a.message == b.message;
    }

    if (Object.is(a, b)) {
        return true;
    }
    // A strict comparison is necessary because `null == undefined`.
    if (a === null || b === null) {
        return a === b;
    }
    var className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b)) {
        return false;
    }
    switch (className) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
        if (typeof a !== typeof b) {
            // One is a primitive, one a `new Primitive()`
            return false;
        } else if (typeof a !== 'object' && typeof b !== 'object') {
            // both are proper primitives
            return Object.is(a, b);
        } else {
            // both are `new Primitive()`s
            return Object.is(a.valueOf(), b.valueOf());
        }
    case '[object Date]':
        // Coerce dates to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
        // RegExps are compared by their source patterns and flags.
    case '[object RegExp]':
        return a.source === b.source && a.flags === b.flags;
    }
    if (typeof a !== 'object' || typeof b !== 'object') {
        return false;
    }

    // Use DOM3 method isEqualNode (IE>=9)
    if (isDomNode(a) && isDomNode(b)) {
        return a.isEqualNode(b);
    }

    // Used to detect circular references.
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        // circular references at same depth are equal
        // circular reference is not equal to non-circular one
        if (aStack[length] === a) {
            return bStack[length] === b;
        } else if (bStack[length] === b) {
            return false;
        }
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    // Compare array lengths to determine if a deep comparison is necessary.
    if (className == '[object Array]' && a.length !== b.length) {
        return false;
    }

    // Deep compare objects.
    var aKeys = keys(a, hasKey),
        key;
    var size = aKeys.length;

    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (keys(b, hasKey).length !== size) {
        return false;
    }

    while (size--) {
        key = aKeys[size];

        // Deep compare each member
        result =
            hasKey(b, key) &&
            eq(a[key], b[key], aStack, bStack, customTesters, hasKey);

        if (!result) {
            return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();

    return result;

};


/**
 * 深度比較 (toStrictEqual)
 * @param a
 * @param b
 * @param isStrictCheck 嚴格(default: false, 開啟則會檢查不可為將物件中的 undefined 視為不同)
 * @param options
 */
function deepCompare(
    a: unknown,
    b: unknown,
    isStrictCheck?: boolean,
    options?: {
        customTesters?: Array<Tester>,
    },
): boolean {
    const customTesters = options?.customTesters || [];
    return eq(a, b, [], [], customTesters, isStrictCheck ? hasKey : hasDefinedKey);
}

export default deepCompare;
