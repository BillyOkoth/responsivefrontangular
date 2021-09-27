/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Observable } from 'rxjs';
import { NzConfig, NzConfigKey } from './config';
export declare class NzConfigService {
    private configUpdated$;
    /** Global config holding property. */
    private config;
    constructor(defaultConfig?: NzConfig);
    getConfigForComponent<T extends NzConfigKey>(componentName: T): NzConfig[T];
    getConfigChangeEventForComponent(componentName: NzConfigKey): Observable<void>;
    set<T extends NzConfigKey>(componentName: T, value: NzConfig[T]): void;
}
/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
export declare function WithConfig<T>(componentName: NzConfigKey, innerDefaultValue?: T): (target: any, propName: any, originalDescriptor?: TypedPropertyDescriptor<T> | undefined) => any;
