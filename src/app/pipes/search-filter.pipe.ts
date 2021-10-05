import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, input: any): any {
   if (input == undefined) return value;

    var items = input.split(' ').filter((x:any) => x).map((x:any) => x.toLowerCase());    
    return value.filter((x:any) => {
      for(var item of items){
        var flag = false;        
        for(var prop in x){                  
          if(prop != '$$hashKey' && (x[prop] + '').toLowerCase().indexOf(item) != -1){
              flag = true;
              break;          
          }
        }
        if(!flag)
          return false;
      }
      return true;
    })

  //   return value.filter(
  //     (item:any) => item.name.toLowerCase().indexOf(input.toLowerCase()) > -1
  //  );

    //return value.filter((val: string | any[]) => val.toString().indexOf(input)) >= 0;
  }
}

