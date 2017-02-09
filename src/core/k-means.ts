/**
 * Eucledian distance between points
 *
 * Square of the sum of the differences between coordinates.
 * Points have to be of equal length.
 *
 * @param {number[]} point1
 * @param {number[]} point2
 * @returns {number}
 */
function distanceBetweenPoints(point1: number[], point2: number[]): number {
	let squaredDistance = 0;
	point1.forEach((coord1, index) => {
		const coord2 = point2[index];
		squaredDistance += (coord1 * coord1) - (coord2 * coord2);
	})
	return Math.sqrt(squaredDistance);
}

/**
 * Return random initial centers for kmeans, taken from the dataset
 *
 * @param {number[][]} points
 * @param {number} clusterCount
 * @returns {number[][]}
 */
function getRandomInitialCenters(points: number[][], clusterCount: number): number[][] {
	const usedIndexes: number[] = [];
	const centers: number[][] = [];
	for (let i = 0; i < clusterCount; i++) {
		let isIndexUsed = true;
		while (isIndexUsed) {
			const randIndex: number = points.length * Math.random() | 0;
			if (usedIndexes.indexOf(randIndex) === -1) {
				usedIndexes.push(randIndex);
				centers.push(points[randIndex].slice());
				isIndexUsed = false;
			}
		}
	}
	return centers;
}

function getPointAssignments(points: number[][], centers: number[][]): number[][] {
	const pointAssignments = centers.map(c => []);
	points.forEach((point, index) => {
			let minDistance = distanceBetweenPoints(point, centers[0]);
			let minIndex = 0;
			for (let i = 1; i < centers.length; i++) {
				let currentDistance = distanceBetweenPoints(point, centers[i]);
				if (currentDistance < minDistance) {
					minDistance = currentDistance;
					minIndex = i;
				}
			}
			pointAssignments[minIndex].push(index);
		});
	return pointAssignments;
}

function getNewCenter(points: number[][], assignedPoints: number[]): number[] {
	const newCenter: number[] = [];
	const pointLength = points[0].length;
	for (let i = 0; i < pointLength; i++) {
		let coordSum = 0;
		assignedPoints.forEach(pointIndex => {
			const point = points[pointIndex];
			coordSum += point[i];
		})
		newCenter.push(coordSum / assignedPoints.length);
	}
	return newCenter;
}

function areArraysDiffent(arr1: any[], arr2: any[]): boolean {
	if (arr1.length !== arr2.length) {
		return true;
	}
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return true;
		}
	}
	return false;
}

function areAssignmentsDifferent(oldPointAssignments: number[][],
																 newPointAssignments: number[][]): boolean {
	let areDifferent = false;
	oldPointAssignments.forEach((oldCenterAssignments, centerIndex) => {
		let newCenterAssignments = newPointAssignments[centerIndex];
		if (areArraysDiffent(oldCenterAssignments, newCenterAssignments)) {
			areDifferent = true;
		}
	});
	return areDifferent;
}

export function kMeans(points: number[][], clusterCount: number): number[][] {
	const centers: number[][] = getRandomInitialCenters(points, clusterCount);
	let pointAssignments: number[][] = centers.map(center => [0]);
	let isAnyPointReassigned = true;
	while (isAnyPointReassigned) {
		pointAssignments = getPointAssignments(points, centers);

		centers.forEach((center, index) => {
			centers[index] = getNewCenter(points, pointAssignments[index]);
		});

		let newPointAssignments = getPointAssignments(points, centers);

		isAnyPointReassigned = areAssignmentsDifferent(pointAssignments, newPointAssignments);
	}
	return pointAssignments;
}
