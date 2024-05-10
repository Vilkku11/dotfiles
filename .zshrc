HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000

alias ls='ls --color=always'
export LS_COLORS="$(vivid generate molokai)"

eval "$(starship init zsh)"

source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh