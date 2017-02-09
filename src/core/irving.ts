import Student from '../student';

function unmatchedStudentsExist(students: Student[]): boolean {
  return students.some(student => !student.isMatched());
}

export function stableRoommates(students: Student[]): void {
  while (unmatchedStudentsExist(students)) {
    let firstUnmatched: Student;
    let firstUnmatchedIdx: number;
    for (let i = 0; i < students.length; i++) {
      if (!students[i].isMatched()) {
        firstUnmatched = students[i];
        firstUnmatchedIdx = i;
        break;
      }
    }
    let prefIndex: number;
    let myFavouriteRoommate: Student;
    for (let i = 0; i < firstUnmatched.preferences.value.length; i++) {
      prefIndex = firstUnmatched.preferences.value[i];
      myFavouriteRoommate = students[prefIndex];
      if (!myFavouriteRoommate.hasRejected(firstUnmatchedIdx)) {
        break;
      }
    }
    if (myFavouriteRoommate === undefined) {
      continue;
    }
    firstUnmatched.proposeTo(myFavouriteRoommate, firstUnmatchedIdx, prefIndex);
    if (!myFavouriteRoommate.hasBeenProposed()) {
      myFavouriteRoommate.accept(firstUnmatched, prefIndex, firstUnmatchedIdx);
    } else if (myFavouriteRoommate.isMatched() && myFavouriteRoommate.prefersOver(firstUnmatchedIdx,
      myFavouriteRoommate.matched)) {
      myFavouriteRoommate.accept(firstUnmatched, prefIndex, firstUnmatchedIdx);
      myFavouriteRoommate.reject(students[myFavouriteRoommate.matched],
        prefIndex, myFavouriteRoommate.matched)
      students[myFavouriteRoommate.matched].reject(myFavouriteRoommate,
        myFavouriteRoommate.matched,
        prefIndex);
    } else {
      myFavouriteRoommate.reject(firstUnmatched, prefIndex, firstUnmatchedIdx);
      firstUnmatched.reject(myFavouriteRoommate, firstUnmatchedIdx, prefIndex);
    }
  }

  for (let i = 0; i < students.length; i++) {
    students[i].rejectLowerThanMatched(students, i);
  }
}
