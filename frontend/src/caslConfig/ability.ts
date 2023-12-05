import { AbilityBuilder, AbilityClass,Ability } from '@casl/ability';

export type Actions = 'view' | 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Todo' | 'ProductsListRoute';

export type AppAbility = Ability<[Actions, Subjects]>;
export const appAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder(appAbility);

  if (role === 'admin') {
    can('view', 'ProductsListRoute');
  } else {
    can(['read', 'create'], 'Todo');
    can(['update', 'delete'], 'Todo');
  }

  return rules;
}

export function buildAbilityFor(role: string): AppAbility {
  return new appAbility(defineRulesFor(role), {
    detectSubjectType: (object: any) => object,
  });
}
