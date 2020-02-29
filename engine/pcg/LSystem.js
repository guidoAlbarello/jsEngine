class LSystem {
    constructor(axiom, production_rules) {
        this.axiom = axiom;
        this.production_rules = production_rules;
    }    

    produce (n) {
        let previous_result = "";
        let current_result = "";
        
        previous_result = this.axiom;
        for (let i = 0; i < n; i++) {
            current_result = "";
            for (let j = 0; j < previous_result.length; j++) {
                let new_string = previous_result.charAt(j);
                if (this.production_rules[new_string]) {
                    new_string = this.production_rules[new_string];
                }
                current_result = current_result.concat(new_string);
            }

            if (current_result == previous_result)
                break;
            previous_result = current_result;
        }

        return current_result;
    }
}