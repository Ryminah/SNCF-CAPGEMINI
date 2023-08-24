import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ptiv',
  templateUrl: './ptiv.component.html',
  styleUrls: ['./ptiv.component.css']
})
export class PtivComponent implements OnInit {
  BoolenButtom:any;
  constructor(private dataService: DataService,
    //private activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.diplayHidComp()
  }

  diplayHidComp(){
    /*
    this.dataService.data3.subscribe(response => {
      this.BoolenButtom = response;
      this.BoolenButtom=true;
      console.log(response)
    });
    */
  }
  
  closeModal() {
    // this.activeModal.close('Modal Closed');
  }


}
