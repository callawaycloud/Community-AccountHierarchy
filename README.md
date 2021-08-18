# Account Hierarchy

A simple component that is used in Experience Cloud to view the Account Hierarchy of all accounts the user has access to.

![Imgur](https://i.imgur.com/J91Nt65.png)
![Imgur](https://i.imgur.com/ZOZ3GD2.png)

## 📦 Install

**via sfdx-cli**
`sfdx force:package:install --package 0Ho5e00000000dKCAQ -u your@org.user`

**via url**
login and navigate to [`/packaging/installPackage.apexp?p0=0Ho5e00000000dKCAQ`](https://login.salesforce.com/packaging/installPackage.apexp?p0=0Ho5e00000000dKCAQ). Choose `Install for: Admin Only`.

## 🔨 Usage

1. Add the clas ``CommunityAccountHierarchyHelper`` to the profile/permission set being used in the community
2. Go to your community in Experience cloud
3. Go to any page and drag the component ``Account Hierarchy`` onto the page
4. Fill in the component parameters as needed (defaults to 1000 account records)

## ✨Features

### Specify the amount of records to pull

- The default amount of Account records to query is 1000
- The community user will only be able to pull in Account records that have access to

### Navigation

- The account names are hyperlinks and will take you to the record detail page

### Top level accounts in the hierarchy are open by default

- When the component loads, you quickly have access to the top level accounts and their children


** Powered by ** [Callaway Cloud Consulting](https://www.callawaycloud.com/)