import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VeXe} from "../../model/ve-xe";
import {NhaXe} from "../../model/nha-xe";
import {VeXeService} from "../../service/ve-xe.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-sua',
  templateUrl: './sua.component.html',
  styleUrls: ['./sua.component.css']
})
export class SuaComponent implements OnInit {
  veXeForm: FormGroup;
  id: number;
  veXe: VeXe;
  nhaXeList: NhaXe[];

  equals(o1: NhaXe, o2: NhaXe){
    return o1.id === o2.id;
  }


  constructor(private veXeService: VeXeService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.veXeService.findAllNhaXe().subscribe(data=>{
      this.nhaXeList = data;
    });
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.veXeService.findById(this.id).subscribe(data=>{
        this.veXe = data;
        this.veXeForm = this.formBuilder.group({
          id: [this.veXe.id],
          giaVe: [this.veXe.giaVe, [
            Validators.required,
            Validators.pattern('^\\d+$')
          ]],
          diemDi: [this.veXe.diemDi,[
            Validators.required
          ]],
          diemDen: [this.veXe.diemDen, [
            Validators.required
          ]],
          ngayKhoiHanh: [this.veXe.ngayKhoiHanh,
            [Validators.required,
              Validators.pattern('^\\d{4}[-]\\d{2}[-]\\d{2}$'), this.kiemTraNgay]],
          gioKhoiHang: [this.veXe.gioKhoiHang,[
            Validators.required,
            Validators.pattern('^(([0,1][0-9])|([2][0-4]))\\:(([0-5][0-9])|(60))$')
          ]],
          nhaXe:[this.veXe.nhaXe, [Validators.required]],
          soLuong:[this.veXe.soLuong]
        });
      });
    });
  }

  updateVeXe(id: number){
    const veXe = this.veXeForm.value;
    this.veXeService.updateVe(id, veXe).subscribe(data=>{
      this.veXeService.showSuccessNotice('Thành Công');
    }, error => {
      this.veXeService.showError('Thất bại');
    },() => {
      this.router.navigateByUrl("");
    });
  }

  kiemTraNgay(abstractControl: AbstractControl): any {
    const ngayKhoiHanh = new Date(abstractControl.value).getTime();
    const hienTai = new Date().getTime();
    return (ngayKhoiHanh - hienTai > 24 * 60 * 60 * 1000) ? null : {ngayKhoiHanhKhongDung: true};
  }

}
