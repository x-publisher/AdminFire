import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Record } from './../../../models/record.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit {
  record: any;
  recordForm: FormGroup;
  isNew : boolean = true;
  id: number;
  private sub :any;

  constructor(private db: FirestoreService, private fb: FormBuilder, private route: ActivatedRoute, private router : Router) {
    this.recordForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      label: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  createNewRecord(form:any) {
    const { title, image, label, content, type, archived, pending_removal } = form.value;
    
    this.db.add('records', {title, image, label, content, archived: false, type: 'line', pending_removal: false})
    .then(() => this.router.navigate(['/line']));
  }
  
}