import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SafePipeModule } from 'safe-pipe';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    BreadcrumbModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RippleModule,
    SafePipeModule,
    ToastModule,
    TooltipModule
  ],
  exports: [
    BreadcrumbModule,
    BrowserAnimationsModule,
    ButtonModule,
    CommonModule,
    EditorModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RippleModule,
    SafePipeModule,
    ToastModule,
    TooltipModule
  ]
})
export class SharedModule { }
