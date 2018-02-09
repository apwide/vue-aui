import AuiNavVertical from "./NavVertical.vue"
import AuiNavTab from "./NavTab.vue"

export default {
  render(createElement) {
    const auiNavGroups = this.getGroupsAndHeaders().map(groupOrHeader => {
      if (groupOrHeader.componentOptions.tag === 'va-nav-group' || groupOrHeader.componentOptions.tag === 'aui-nav-group') {
        const children = groupOrHeader.componentOptions && groupOrHeader.componentOptions.children || [];
        children
          .filter(s => (s.componentOptions && (s.componentOptions.tag === 'aui-nav-item' || s.componentOptions.tag === 'va-nav-item')))
          .forEach(tab => {
            tab.componentOptions.propsData.selected = tab.componentOptions.propsData.name === this.selectedTab
            tab.data.on = {
              click: () => this.selectedTab = tab.componentOptions.propsData.name
            }
          });
      }
      return groupOrHeader
    });

    const selectedItem = this.getItems().filter(item => item.componentOptions.propsData.name === this.selectedTab)[0]
      || this.getItems()[0];

    const tabElement = createElement(AuiNavTab, selectedItem && selectedItem.componentOptions.children)
    const auiNavVertical = createElement(AuiNavVertical, [auiNavGroups]);
    const auiPagePanelNav = createElement('div', {class: 'aui-page-panel-nav'}, [auiNavVertical]);
    return createElement('div', [auiPagePanelNav, tabElement]);
  },

  data() {
    return {
      selectedTab: undefined
    }
  },

  created() {
    const firstItem = this.getItems()[0]
    this.selectedTab = firstItem.componentOptions.propsData.name;
  },

  methods: {
    clicked(tab) {
      this.selectedTab = tab.data.attrs.name
    },

    getGroupsAndHeaders() {
      return this.$slots.default
        .filter(item => item.componentOptions)
        .filter(item => item.componentOptions.tag === 'va-nav-group' || item.componentOptions.tag === 'va-nav-header'
          || item.componentOptions.tag === 'aui-nav-group' || item.componentOptions.tag === 'aui-nav-header')
    },

    getItems() {
      return this.getGroupsAndHeaders()
        .reduce((items, group) => group.componentOptions.children ? items.concat(group.componentOptions.children) : items, [])
        .filter(item => item.componentOptions)
        .filter(item => item.componentOptions.tag === 'va-nav-item' || item.componentOptions.tag === 'aui-nav-item')
    }
  },
}
