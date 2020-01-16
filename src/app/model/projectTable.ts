import { UserTable } from "src/app/model/userTable";

export class ProjectTable{
    public  Project_ID : string
    public  Project_Name : string
    public  Start_Date : Date
    public  End_Date : Date
    public  Priority : number
}

export class ProjectDetails{
    public  Project_ID : string
    public  Project_Name : string
    public  Start_Date : Date
    public  End_Date : Date
    public  Priority : number
    public  NoOfTasks : number
    public  NoOfTasksCompleted : number
    public  Manager : UserTable
}