import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe', pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(valueList: Array<any>, nameToFilter: any): any {
    if (valueList && valueList.length){
      return valueList.filter(item=>{
        if(nameToFilter && item.Project_Name){
          if(item.Project_Name.toLowerCase().indexOf(nameToFilter.toLowerCase()) == -1){
            return false;
          }
        }
        if(nameToFilter && item.Task_Name){
          if(item.Task_Name.toLowerCase().indexOf(nameToFilter.toLowerCase()) == -1){
            return false;
          }
        }
        if(nameToFilter && item.First_Name){
          if(item.First_Name.toLowerCase().indexOf(nameToFilter.toLowerCase()) == -1){
            return false;
          }
        }
        return true;
      })
    }
    else{
      return valueList;
    }
   
  } 
  
}
