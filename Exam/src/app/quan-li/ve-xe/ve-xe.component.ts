import {Component, OnInit} from '@angular/core';
import {VeXe} from "../../model/ve-xe";
import {NhaXe} from "../../model/nha-xe";
import {VeXeService} from "../../service/ve-xe.service";

@Component({
  selector: 'app-ve-xe',
  templateUrl: './ve-xe.component.html',
  styleUrls: ['./ve-xe.component.css']
})
export class VeXeComponent implements OnInit {

  danhSachVe: VeXe[] = [];
  ve: VeXe | undefined;
  danhSachNha: NhaXe[] = [];
  p: number = 1;

  diemDiSearch: string;
  diemDenSearch: string;
  ngayBatDauSearch: '2022-12-02';
  ngayKetThucSearch: '2023-01-02';

  xoaVe: VeXe;
  diemDi = '';
  diemDen = '';
  ngayDi = '';
  gioDi = '';

  constructor(private veXeService: VeXeService) {
  }

  ngOnInit(): void {
    this.diemDenSearch = '';
    this.diemDiSearch = '';
    ngayBatDauSearch: '2022-12-02';
    ngayKetThucSearch: '2023-01-02';
    this.getListNhaXe();
    this.getListVeXe();
  }

  getListVeXe() {
    this.veXeService.findAll().subscribe(data => {
      this.danhSachVe = data;
    }, error => {
      this.veXeService.showError('Không thể lấy danh sách vé xe');
    });
  }

  getListNhaXe() {
    this.veXeService.findAllNhaXe().subscribe(data => {
      this.danhSachNha = data;
    }, error => {
      this.veXeService.showError('Không thể lấy danh sách nhà xe');
    });
  }

  search() {
    this.p = 1;
    this.veXeService.search(this.diemDiSearch, this.diemDenSearch).subscribe(data => {
      this.danhSachVe = data;
    }, error => {
      this.veXeService.showError('Không thể tìm kiếm được');
    });
  }

  searchAll() {
    this.p = 1;
    this.veXeService.search(this.diemDiSearch, this.diemDenSearch).subscribe(data => {
      this.danhSachVe = data.filter(value => {
        const ngay = new Date(value.ngayKhoiHanh);
        const ngayBatDau = new Date(this.ngayBatDauSearch);
        const ngayKetThuc = new Date(this.ngayKetThucSearch);
        if (ngay >= ngayBatDau && ngay <= ngayKetThuc) {
          return data;
        }
      });
    });
  }

  xacNhanDatVe(id: number) {
    this.veXeService.findById(id).subscribe(data => {
      this.ve = data;
    });
  }

  datVe() {
    this.ve.soLuong = this.ve.soLuong - 1;
    this.veXeService.update(this.ve).subscribe(data => {
      this.veXeService.showSuccessNotice('Đặt vé thành công!');
    }, error => {
      this.veXeService.showError('Đặt vé không thành công!');
    }, () => {
      this.ngOnInit();
    });
  }


  xoaVeXe(id: number) {
    this.veXeService.findById(id).subscribe(data => {
      this.xoaVe = data;
      this.diemDi = this.xoaVe.diemDi;
      this.diemDen = this.xoaVe.diemDen;
      this.gioDi = this.xoaVe.gioKhoiHang;
      this.ngayDi = this.xoaVe.ngayKhoiHanh;
    });
  }

  xoaVeXeTheoId(id: number) {
    const veXe = this.xoaVe;
    this.veXeService.delete(id, veXe).subscribe(data => {
      this.veXeService.showSuccessNotice('Thành Công');
    }, error => {
      this.veXeService.showError('Không thành công!');
    }, () => {
      this.ngOnInit();
    });
  }

}
