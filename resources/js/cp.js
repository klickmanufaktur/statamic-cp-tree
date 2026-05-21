import { bootStatamicCpTree } from './boot';

if (Statamic.$app) {
    bootStatamicCpTree();
} else {
    Statamic.booted(bootStatamicCpTree);
}
