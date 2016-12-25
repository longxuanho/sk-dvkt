import { Injectable } from '@angular/core';

import { AuthService } from '../../core/shared/auth.service';
import { UserProfile } from '../../core/shared/user-profile.model';
import { dateTimeStringFormat } from '../../core/shared/date-time-format.model';

declare var moment: any;

@Injectable()
export class MetadataService {

    auth: { data: UserProfile | null };

    constructor(
        private authService: AuthService
    ) {
        this.auth = this.authService.getAuthProfile();
    }

    setMetadata(rawData) {
        if (!!this.auth.data) {
            rawData.created_by = this.auth.data.$key;
            rawData.created_by_name = this.auth.data.displayName;
            rawData.created_by_email = this.auth.data.email;
        }
        rawData.created_when = moment().format(dateTimeStringFormat);
    }

}
