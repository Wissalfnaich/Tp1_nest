import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';
@Injectable()
export class TestService {
    constructor(private commonService: CommonService) {}

  testUUID(): string {
    return this.commonService.generateUUID();
  }
}
