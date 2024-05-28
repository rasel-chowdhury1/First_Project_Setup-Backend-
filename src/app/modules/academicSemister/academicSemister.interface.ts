export type Tmonths = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export type TacademicSemisterName = 'Autumn' | 'Summer' | 'Fall';
export type TacademicSemisterCode = '01' | '02' | '03';

export type TacademicSemister = {
    name: TacademicSemisterName,
    code: TacademicSemisterCode,
    year: string,
    startMonth: Tmonths,
    endMonth: Tmonths
}

//semister name -----> semmister code
   // 'Autumn' ----------> '01'
   // 'Summer'  ----------> '02'
   // 'Fall'   ----------> '03'
   
export type TacademicSemisterNameCodeMappper = {
    // "Autumn": '01',
    // "Summer": '02',
    // "Fall": '03'

    //above code shortcut using map type
    [key: string]: string;
   };



export default TacademicSemister;