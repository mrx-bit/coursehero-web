import {Injectable} from '@angular/core';

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: '/dashboard/crm',
        name: 'Dashboard',
        type: 'button',
        icon: '',
    },
    {
        name: 'Content',
        type: 'button',
        icon: '',
    },
    {
        name: 'Aidar',
        type: 'sub',
        class: 'group-title',
        showColumns: 'show-column-4',
        icon: '',
        children: [
            {
                state: 'horizontal/components',
                name: 'Odd Image',
                type: 'subChild',
                icon: 'layers',
            },
            {
                state: 'horizontal/components',
                name: 'Create word',
                type: 'subChild',
                icon: 'format_shapes',
            },
            {
                state: 'horizontal/tables',
                name: 'Wrong word',
                type: 'subChild',
                icon: 'format_line_spacing',
            },
            {
                state: 'horizontal/chart',
                name: 'Think to ind',
                type: 'subChild',
                icon: 'show_chart',
            },
            {
                state: 'horizontal/forms',
                name: 'Put letters',
                type: 'subChild',
                icon: 'drag_indicator',
            },
        ]
    },
    {
        name: 'My books',
        type: 'sub',
        class: 'group-title',
        icon: '',
        children: [
            {
                state: 'horizontal/pages',
                name: 'Bilgen Alippe',
                type: 'subChild',
                icon: 'import_contacts',
            },
            {
                state: 'horizontal/users',
                name: 'Bilgen Math',
                type: 'subChild',
                icon: 'web',
            },
            {
                state: 'horizontal/user-management',
                name: 'Bilgen Dunietanu',
                type: 'subChild',
                icon: 'view_list',
            },
            {
                state: 'session',
                name: 'Add new book',
                type: 'subChild',
                icon: 'add',
            }
        ]
    }
];

@Injectable()
export class HorizontalMenuItems {
    getAll() {
        return MENUITEMS;
    }
}
