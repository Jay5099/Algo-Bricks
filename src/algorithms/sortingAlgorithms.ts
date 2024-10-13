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
                console.log(`Swapped: ${i} and ${j}`);
            } else {
                pairs.push({
                    xx: i + 1,
                    yy: j,
                    changed: false,
                });
                console.log(`No swap: ${i + 1} and ${j}`);
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
        console.log(`Swapped pivot: ${i + 1} and ${high}`);

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