import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, OnInit {
  @Input() required: string;

  onChange: Function;
  file: File | null = null;

  ngOnInit(): void {
    console.log(this.required);
  }

  @ViewChild('fileInput', { static: true }) fileInput$: ElementRef;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (file.size > 26214400) {
      alert('File too large. Maximum 25MB');
      this.fileInput$.nativeElement.value = '';
    } else if (file.type !== 'application/pdf') {
      alert('Only pdf file will be accepted');
      this.fileInput$.nativeElement.value = '';
    } else {
      this.onChange(file);
      this.file = file;
    }
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
