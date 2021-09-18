import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {

  
  constructor(private account: AccountService,
              ) { }

  ngOnInit(): void {

  }

  setContributorsBasedOnExcel(event : any) {
    console.log({event : event});
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        const result : any = fileReader.result
        var data = new Uint8Array(result);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log((XLSX.utils.sheet_to_json(worksheet,{raw:true})));
        const arrayAccountsToUpdate = (XLSX.utils.sheet_to_json(worksheet,{raw:true}))
                                      .filter((infos : any) => infos.Promotion !== undefined && infos.Nom !== undefined && infos["Cotisant BDA"] && (infos["Cotisant BDA"].toLowerCase() === "oui" || infos["Cotisant BDA"].toLowerCase() === "non"))
                                      .map((infos : any) => {return {login : (infos.Promotion.slice(1) + infos.Nom.toLowerCase().replaceAll('\'', "").replaceAll(" ", "").substring(0, 8)), contributor : infos["Cotisant BDA"].toLowerCase() === "oui" ? true : false}})
        
        arrayAccountsToUpdate.forEach(
          async element => {
            await this.account.modifyAccount(element.login, {contributor : element.contributor}, false);
          }
        )

        console.log(arrayAccountsToUpdate);
    }
    fileReader.readAsArrayBuffer(event.target.files[0]);
  }

}
