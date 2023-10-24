import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {AccountService} from '../services/account.service';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {


  constructor(private account: AccountService, private auth: AuthService
  ) {
  }
  
  token: string | null;

  ngOnInit(): void {
      this.token = this.auth.token;
  }

  setContributorsBasedOnExcel(event: any) {
    console.log({event: event});
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      const result: any = fileReader.result
      var data = new Uint8Array(result);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type: "binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];

      const json_sheet = XLSX.utils.sheet_to_json(worksheet, {raw: true})
      console.log("Comptes lus:")
      console.log(json_sheet);

      const cleaned_sheet = json_sheet.filter(
        (infos : any) =>
          infos.Promotion !== undefined
          && infos.Nom !== undefined
          && infos["Cotisant BDA"]
          && (infos["Cotisant BDA"].toLowerCase() === "oui" || infos["Cotisant BDA"].toLowerCase() === "non")
      )
      const formatted_sheet = cleaned_sheet.map(
        (infos : any) => {
          console.log(infos);
          const subscriberLogin = infos.Promotion.slice(1)
            + infos.Nom.toLowerCase().replaceAll('\'', "").replaceAll(" ", "").substring(0, 8)
          const is_contrib = infos["Cotisant BDA"].toLowerCase() === "oui"
          return {subscriberLogin : subscriberLogin, contributor: is_contrib}
        }
      )

      formatted_sheet.forEach(
        async element => {
          await this.account.modifySubscriber(this.token, element.subscriberLogin, {contributor: element.contributor}, false); // Why login and not token ? Not consistent with modifyAccount declaration
        }
      )
      console.log("Comptes à mettre à jour:")
      console.log(formatted_sheet);
    }

    fileReader.readAsArrayBuffer(event.target.files[0]);
  }

}
