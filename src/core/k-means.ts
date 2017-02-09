export function kmeans(arrayToProcess, Clusters) {

	var Groups = new Array();
	var Centroids = new Array();
	var oldCentroids = new Array();
	var changed = false;

	// initialise group arrays
	for (let initGroups = 0; initGroups < Clusters; initGroups++) {
		Groups[initGroups] = new Array();
	}
	// pick initial centroids

    let initialCentroids = Math.round(arrayToProcess.length / (Clusters + 1));
	for (let i = 0; i < Clusters; i++) {
		Centroids[i] = arrayToProcess[(initialCentroids * (i + 1))];
	}
	do {
		for (let j = 0; j < Clusters; j++) {
			Groups[j] = [];
		}
		changed = false;
		for (let i = 0; i < arrayToProcess.length; i++) {
			let Distance = -1;
			let oldDistance = -1
			for (let j = 0; j < Clusters; j++) {
				let distance = Math.abs(Centroids[j] - arrayToProcess[i]);
				if (oldDistance == -1) {
					oldDistance = distance;
					let newGroup = j;
				}
				else if (distance <= oldDistance) {
					var newGroup = j;
					oldDistance = distance;
				}
			}
			Groups[newGroup].push(arrayToProcess[i]);
		}
		oldCentroids = Centroids;
		for (let j = 0; j < Clusters; j++) {
			let total = 0;
			let newCentroid = 0;
			for (let i = 0; i < Groups[j].length; i++) {
				total += Groups[j][i];
			}
			newCentroid = total / Groups[newGroup].length;
			Centroids[j] = newCentroid;
		}

		for (let j = 0; j < Clusters; j++) {
			if (Centroids[j] != oldCentroids[j]) {
				changed = true;
			}
		}
	} while (changed == true);
  return Groups;
}
