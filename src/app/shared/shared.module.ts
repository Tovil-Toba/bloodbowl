import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { SafePipeModule } from 'safe-pipe';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    BreadcrumbModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
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
    ScrollPanelModule,
    TabViewModule,
    TableModule,
    ToastModule,
    TooltipModule
  ],
  exports: [
    BreadcrumbModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    EditorModule,
    DialogModule,
    DividerModule,
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
    ScrollPanelModule,
    TabViewModule,
    TableModule,
    ToastModule,
    TooltipModule
  ]
})
export class SharedModule { }
