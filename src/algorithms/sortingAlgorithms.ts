// Define the type for a rectangle object
interface RectType {
    key: string;
    status: string;
    height: number;
    width: number;
    isSorted: boolean;
    isSorting: boolean;
  }

// Define the type for sorting steps
interface Step {
    xx: number;  // First index being compared/swapped
    yy: number;  // Second index being compared/swapped
    changed: boolean;  // Whether the elements were swapped
}

// Bubble Sort Algorithm
export function bubbleSort(rects: RectType[]): Step[] {
    const pairs: Step[] = [];
    const n: number = rects.length;
    const prevRect = rects.slice();


    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (prevRect[j].height > prevRect[j + 1].height) {
                // Swap the rectangles
                const temp = prevRect[j];
                prevRect[j] = prevRect[j + 1];
                prevRect[j + 1] = temp;
                pairs.push({
                    xx: j,
                    yy: j + 1,
                    changed: true,
                });
            } else {
                pairs.push({
                    xx: j,
                    yy: j + 1,
                    changed: false,
                });
            }
        }
        // Mark the last element of this pass as sorted
        pairs.push({
            xx: n - i - 1,
            yy: n - i - 1,
            changed: false,
        });
    }

    // Mark the first element as sorted at the end
    pairs.push({
        xx: 0,
        yy: 0,
        changed: false,
    });

    return pairs;
}

// Selection Sort Algorithm
export function selectionSort(rects: RectType[]): Step[] {
    const pairs: Step[] = [];
    const n: number = rects.length;
    const prevRect = rects.slice();

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;

        for (let j = i + 1; j < n; j++) {
            pairs.push({
                xx: min_idx,
                yy: j,
                changed: false,
            });

            if (prevRect[j].height < prevRect[min_idx].height) {
                min_idx = j;
            }
        }

        // Swap the found minimum element with the first element
        const recti = { ...prevRect[i] };
        const rectj = { ...prevRect[min_idx] };
        prevRect[min_idx] = recti;
        prevRect[i] = rectj;

        pairs.push({
            xx: min_idx,
            yy: i,
            changed: true,
        });

        pairs.push({
            xx: i,
            yy: i,
            changed: false,
        });
    }

    pairs.push({
        xx: n - 1,
        yy: n - 1,
        changed: false,
    });

    return pairs;
}

// Insertion Sort Algorithm
export function insertionSort(rects: RectType[]): Step[] {
    const pairs: Step[] = [];
    const n: number = rects.length;
    const prevRect = rects.slice();

    for (let i = 1; i < n; i++) {
        let key = prevRect[i].height;
        let j = i - 1;

        // Move elements of rects[0..i-1], that are greater than key, to one position ahead
        // of their current position
        while (j >= 0 && prevRect[j].height > key) {
            const recti = { ...prevRect[j] };
            const rectj = { ...prevRect[j + 1] };
            prevRect[j + 1] = recti;
            prevRect[j] = rectj;

            pairs.push({
                xx: j,
                yy: j + 1,
                changed: true,
            });

            j = j - 1;
        }
        prevRect[j + 1].height = key;
    }

    // Mark all elements as sorted
    for (let i = 0; i < n; i++) {
        pairs.push({
            xx: i,
            yy: i,
            changed: true,
        });
    }

    return pairs;
}

// Quick Sort Algorithm (recursive)
export function quickSort(rects: RectType[]): Step[] {
    const pairs: Step[] = [];
    const prevRect = rects.slice();

    const partition = (low: number, high: number): number => {
        const pivot = prevRect[high].height;
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (prevRect[j].height < pivot) {
                i++;
                const recti = { ...prevRect[i] };
                const rectj = { ...prevRect[j] };
                prevRect[i] = rectj;
                prevRect[j] = recti;

                pairs.push({
                    xx: i,
                    yy: j,
                    changed: true,
                });
                // console.log(`Swapped: ${i} and ${j}`);
            } else {
                pairs.push({
                    xx: i + 1,
                    yy: j,
                    changed: false,
                });
                // console.log(`No swap: ${i + 1} and ${j}`);
            }
        }

        // Swap the pivot element to its correct position
        const recti = { ...prevRect[i + 1] };
        const rectPivot = { ...prevRect[high] };
        prevRect[i + 1] = rectPivot;
        prevRect[high] = recti;

        pairs.push({
            xx: i + 1,
            yy: high,
            changed: true,
        });
        // console.log(`Swapped pivot: ${i + 1} and ${high}`);

        return i + 1;
    };

    const quickSortRecursive = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            quickSortRecursive(low, pi - 1);
            quickSortRecursive(pi + 1, high);
        }
    };

    quickSortRecursive(0, prevRect.length - 1);

    return pairs;
}

export function rquickSort(rects: RectType[]): Step[] {
    const pairs: Step[] = [];
    const prevRect = rects.slice();

    const partition = (low: number, high: number): number => {
        const pivot = prevRect[high].height;
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (prevRect[j].height < pivot) {
                i++;
                const recti = { ...prevRect[i] };
                const rectj = { ...prevRect[j] };
                prevRect[i] = rectj;
                prevRect[j] = recti;

                pairs.push({
                    xx: i,
                    yy: j,
                    changed: true,
                });
            } else {
                pairs.push({
                    xx: i + 1,
                    yy: j,
                    changed: false,
                });
            }
        }

        // Swap the pivot element to its correct position
        const recti = { ...prevRect[i + 1] };
        const rectPivot = { ...prevRect[high] };
        prevRect[i + 1] = rectPivot;
        prevRect[high] = recti;

        pairs.push({
            xx: i + 1,
            yy: high,
            changed: true,
        });

        return i + 1;
    };

    const quickSortRecursive = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            quickSortRecursive(low, pi - 1);
            quickSortRecursive(pi + 1, high);
        }
    };

    quickSortRecursive(0, prevRect.length - 1);

    return pairs;
}

type StepM = {
    left: number;
    right: number;
    mid: number;
    val: RectTypeM[];
};


type RectTypeM = {
    width: number;
    height: number;
    isLeft?: boolean;
    isSorting?: boolean;
    isRight?: boolean;
    isRange?: boolean;
    isSorted?: boolean;
  };

let values: StepM[] = [];

export function mergeSort(rects2: RectTypeM[]): StepM[] {
    let rects = rects2.slice();
    values = [];
    let sz = rects2.length - 1;
    mergeSortRecursive(rects, 0, sz);
    return values;
}

function merge(rects: RectTypeM[], l: number, m: number, r: number): void {
    let n1 = m - l + 1;
    let n2 = r - m;

    const L = rects.slice(l, m + 1);
    const R = rects.slice(m + 1, r + 1);
    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i].width <= R[j].width) {
            rects[k] = L[i];
            i++;
        } else {
            rects[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        rects[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        rects[k] = R[j];
        j++;
        k++;
    }
}

function mergeSortRecursive(rects: RectTypeM[], l: number, r: number): void {
    if (l >= r) return;

    const m = Math.floor(l + (r - l) / 2);

    mergeSortRecursive(rects, l, m);
    mergeSortRecursive(rects, m + 1, r);
    merge(rects, l, m, r);

    const rectsCopy = rects.slice(l, r + 1);
    const value: StepM = {
        left: l,
        right: r,
        mid: m,
        val: rectsCopy,
    };

    values.push(value);
}

type StepH = {
    left: number;
    right: number;
    sorted: boolean;
};

let valuesH: StepH[] = [];

export function heapSort(rects2: RectType[]): StepH[] {
    let rects = rects2.slice();
    valuesH = [];
    let sz = rects2.length;
    performHeapSort(rects, sz);
    return valuesH;
}

function heapify(rects: RectType[], n: number, i: number): void {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && rects[l].width > rects[largest].width) largest = l;
    if (r < n && rects[r].width > rects[largest].width) largest = r;

    if (largest != i) {
        const temp = rects[i];
        rects[i] = rects[largest];
        rects[largest] = temp;

        const valueH: StepH = {
            left: i,
            right: largest,
            sorted: false
        };
        valuesH.push(valueH);

        heapify(rects, n, largest);
    }
}

function performHeapSort(rects: RectType[], n: number): void {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(rects, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        const temp = rects[i];
        rects[i] = rects[0];
        rects[0] = temp;

        const valueH: StepH = {
            left: i,
            right: 0,
            sorted: true
        };
        valuesH.push(valueH);

        heapify(rects, i, 0);
    }
}
