
import {asset} from '@/utils';

import {IBallCategoryCarouselData} from './types';

export const mockData: IBallCategoryCarouselData[] = [
    {id: '1', name: 'Soccer', path: asset('/examples/category_panel/category/soccer.png'), activePath: asset('/examples/category_panel/category/soccer_active.png'), count: 12},
    {id: '2', name: 'Basketball', path: asset('/examples/category_panel/category/basketball.png'), activePath: asset('/examples/category_panel/category/basketball_active.png'), count: 6},
    {id: '3', name: 'Football', path: asset('/examples/category_panel/category/football.png'), activePath: asset('/examples/category_panel/category/football_active.png'), count: 4},
    {id: '4', name: 'Tennis', path: asset('/examples/category_panel/category/tennis.png'), activePath: asset('/examples/category_panel/category/tennis_active.png'), count: 2},
    {id: '5', name: 'Volleyball', path: asset('/examples/category_panel/category/volleyball.png'), activePath: asset('/examples/category_panel/category/volleyball_active.png'), count: 1},
    {id: '6', name: 'Boxing', path: asset('/examples/category_panel/category/boxing.png'), activePath: asset('/examples/category_panel/category/boxing_active.png'), count: 1},
    {id: '7', name: 'Cricket', path: asset('/examples/category_panel/category/cricket.png'), activePath: asset('/examples/category_panel/category/cricket_active.png'), count: 1},
    {id: '8', name: 'Golf', path: asset('/examples/category_panel/category/golf.png'), activePath: asset('/examples/category_panel/category/golf_active.png'), count: 5},
];
