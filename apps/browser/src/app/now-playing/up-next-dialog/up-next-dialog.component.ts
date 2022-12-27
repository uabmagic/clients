import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpNextDialogData } from '@app/shared/models/dialog-data/up-next-dialog-data.model';

@Component({
  selector: 'app-up-next-dialog',
  templateUrl: './up-next-dialog.component.html',
  styleUrls: ['./up-next-dialog.component.scss']
})
export class UpNextDialogComponent {
  songs!: string[];

  constructor(
    public dialogRef: MatDialogRef<UpNextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpNextDialogData
  ) {
    this.songs = data.songs;
  }
}
