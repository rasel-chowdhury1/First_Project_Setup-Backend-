
export  const CalculateGradeAndPoint = (totalMarks: number) => {
    let result= {
        grade: 'NA',
        gradPoints: 0
    }

    /**
     * 0-32 -> F
     * 33-39 -> D
     * 40-59 -> C
     * 60-79 -> B
     * 80-100 -> A
     */

    if(totalMarks >= 0 && totalMarks <= 32){
        result.grade = "F",
        result.gradPoints = 0
    }
    else if(totalMarks >= 33 && totalMarks <= 39){
        result.grade = "D",
        result.gradPoints = 2.00
    }
    else if(totalMarks >= 40 && totalMarks <= 59){
        result.grade = "C",
        result.gradPoints = 3.00
    }
    else if(totalMarks >= 60 && totalMarks <= 79){
        result.grade = "B",
        result.gradPoints = 4.00
    }
    else if(totalMarks >= 80 && totalMarks <= 100){
        result.grade = "A",
        result.gradPoints = 5.00
    }

    return result
}